import { Params } from 'src/structures/typings';

export default async ({ args: [message] }: Params<'messageCreate'>) => {
  console.log(message.content);
};
