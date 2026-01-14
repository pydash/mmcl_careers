import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ApplicationsPage() {
  return (
    <div>
      <div className="mb-6 flex gap-3">
        <Button className='w-80 justify-start rounded-full bg-white text-black hover:bg-gray-100'>
          Search
        </Button>
         <Button className='w-30 justify-start rounded-full bg-white text-black hover:bg-gray-100'>
          Filter
        </Button>
         <Button className='w-30 justify-start rounded-full bg-white text-black hover:bg-gray-100'>
          View
        </Button>
      </div>
      <div>
       <Card>
  <div>
    <div className="flex justify-between">
      <small className="text-xs">App Number: placeholder</small>
      <small className="text-xs">Status: placeholder</small>
    </div>
    <Separator className="my-4" />
    <div className="flex justify-between pt-4 items-start">
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-lg">
          Assistant Professor
        </label>
        <small className="text-xs text-muted-foreground">
          Master's Degree in Computer Science, at least 2 years teaching experience.
        </small>
      </div>
      <div className="flex items-center gap-2">
        <small className="text-xs text-muted-foreground">
          Applied: Sept 10 2025
        </small>
        <Button className='w-30 bg-[#001C43] text-white hover:bg-gray-100'>
          View Details
        </Button>
      </div>
    </div>
  </div>
</Card>

      </div>
    </div>
  );
}
