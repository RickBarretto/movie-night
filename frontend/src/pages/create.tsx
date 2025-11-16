import Link from 'next/link';

import { Button } from '@/components/Button';
import { Callout } from '@/components/Callout';
import { TextInput } from '@/components/Input';
import { CardForm } from '@/components/Form';

export default function CreatePage() {
  return (
    <div className="max-w-xl h-screen py-10 mx-auto
      flex flex-col justify-start gap-4"
    >
      <Link href="/">
        <button className="bg-transparent text-white cursor-pointer">
          &larr; Back
        </button>
      </Link>
      <CardForm title="Create a Room">
        <TextInput id="username" placeholder="Your name">
          Your name
        </TextInput>
        <Button type="submit">Create Room</Button>
        <Callout hint="Note">
          After creating the room, you&apos;ll receive a unique room code
          to share with your friends.
          As the host, you&apos;ll have control to finish the voting
          and draw the winning movie.
        </Callout>
      </CardForm>
    </div>
  );
}