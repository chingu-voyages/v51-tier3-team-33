import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

export function DialogPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'>
          Log out
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[425px] flex flex-col items-center rounded'>
        <DialogHeader>
          <DialogDescription className='text-center'>
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex flex-row justify-center gap-4'>
          <Button
            type='button'
            className='bg-red outline-none text-white font-semibold hover:bg-paleRed hover:text-red'>
            Cancel
          </Button>
          <Button
            type='button'
            className='bg-purple outline-none text-white font-semibold hover:bg-solitude hover:text-purple'>
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
