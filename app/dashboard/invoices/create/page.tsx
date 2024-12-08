import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { CreateInvoice } from "@/components/CreateInvoice";
async function getUserData(userId: string) {
  const data = prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true, address: true, email: true },
  });
  return data;
}

export default async function CreateInvoiceRoute() {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);
  return (
    <CreateInvoice
      lastName={data?.lastName as string}
      firstName={data?.firstName as string}
      email={data?.email as string}
      address={data?.address as string}
    />
  );
}