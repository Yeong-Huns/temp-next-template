"use client"

import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSignIn} from "@/hooks/mutations/auth/use-sign-in";
import {toast} from "sonner";
import google from "@/assets/google.png";
import github from "@/assets/github-mark.svg"
import kakao from "@/assets/kakao.svg"
import Image from 'next/image';
import {useRouter} from "next/navigation";
import {loginWithGithub, loginWithGoogle, loginWithKakao} from "@/actions/auth/auth";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

const formSchema = z.object({
    email: z.email({message: "유효한 이메일 형식이 아닙니다."}),
    password: z.string(),
})

export default function SignInPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const router = useRouter();

    const {mutate: signIn, isPending: isSignIn} = useSignIn({
        onSuccess: () => {
            toast.success("로그인 성공", {position: "top-center"});
            router.push("/");
        },
        onError: (error) => {
            toast.error(error.message, {position: "top-center"});
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        signIn(values);
    };

    return (
        <div className={'flex flex-col items-center justify-center h-screen gap-4'}>
            <Card className={'min-w-[300px]'}>
                <CardContent className={'flex flex-col gap-2'}>
                    <div className={'flex flex-col gap-y-3 justify-center mb-8'}>
                        <h1 className={'text-3xl font-bold text-center'}>로그인</h1>
                    </div>
                    {/* 시작 */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-4 min-w-[300px]'}>
                            <FormField control={form.control} name={"email"} render={({field}) => (
                                <FormItem>
                                    <FormLabel>이메일</FormLabel>
                                    <FormControl>
                                        <Input type={"email"} className={'border rounded-sm p-2'}
                                               placeholder={'example@google.com'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name={"password"} render={({field}) => (
                                <FormItem>
                                    <FormLabel>비밀번호</FormLabel>
                                    <FormControl>
                                        <Input type={"password"} className={'border rounded-sm p-2'}
                                               placeholder={'password'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <Button disabled={isSignIn} variant={'outline_red'}
                                    className={'font-bold cursor-pointer rounded-sm p-2 mt-2'}
                                    type={'submit'}>로그인</Button>
                        </form>
                    </Form>
                    <div className={'flex gap-4 mt-1 justify-center items-center text-center text-sm'}>
                        <Link href={'/forget-password'}
                              className={'text-xs text-muted-foreground hover:underline'}>아이디 찾기</Link>
                        <div className={'text-xs text-muted-foreground'}>/</div>
                        <Link href={'/forget-password'}
                              className={'text-xs text-muted-foreground hover:underline'}>비밀번호 찾기</Link>
                        <div className={'text-xs text-muted-foreground'}>/</div>
                        <Link href={'/sign-up'}
                              className={'text-xs text-muted-foreground hover:underline'}>회원가입</Link>
                    </div>
                    <hr className={'mt-1'}/>
                    <div className={'flex justify-center gap-x-3'}>
                        <Button onClick={loginWithGoogle} disabled={isSignIn} variant={'outline'} size={"icon-lg"}
                                className={'rounded-lg'}>
                            <Image width={24} height={24} src={google.src} alt={'google'}
                                   className={'cursor-pointer rounded- object-cover'}/>
                        </Button>
                        <Button onClick={loginWithGithub} disabled={isSignIn} variant={'outline'} size={"icon-lg"}
                                className={'rounded-lg'}>
                            <Image width={24} height={24} src={github.src} alt={'github'}
                                   className={'cursor-pointer rounded- object-cover'}/>
                        </Button>
                        <Button onClick={loginWithKakao} disabled={isSignIn} variant={'outline'} size={"icon-lg"}
                                className={'rounded-lg'}>
                            <Image width={24} height={24} src={kakao.src} alt={'kakao'}
                                   className={'cursor-pointer rounded- object-cover'}/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}