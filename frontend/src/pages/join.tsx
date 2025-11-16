import Link from 'next/link';

import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/Input';
import { Form } from '@/components/Form';

export default function JoinPage() {
  return (
    <div className="max-w-xl h-screen py-10 mx-auto 
      flex flex-col justify-start gap-4"
    >
      <Link href="/">
        <button className="bg-transparent text-white
          cursor-pointer"
        >
          &larr; Back
        </button>
      </Link>
      <Card className="flex flex-col gap-4">
        <Form title="Join a Room">
          <TextInput id="room-code" placeholder="ENTER YOUR ROOM CODE">
            Room Code
          </TextInput>
          <TextInput id="username" placeholder="Enter your name">
            Your name
          </TextInput>
          <Button type="submit">Join Room</Button>
        </Form>
      </Card>
    </div>
  );
}
