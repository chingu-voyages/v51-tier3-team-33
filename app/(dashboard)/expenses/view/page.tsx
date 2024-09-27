"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const frameworks = [
  {
    value: "doe-family",
    label: "Doe Family",
  },
  {
    value: "awesome-dudes",
    label: "Awesome dudes",
  },
  {
    value: "my-love-and-i",
    label: "My Love and I",
  },
];

const friends = [
  {
    value: "john-doe",
    label: "John Doe",
  },
  {
    value: "ana-santos",
    label: "Ana Santos",
  },
  {
    value: "jane-doe",
    label: "Jane Doe",
  },
];

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [open2, setOpen2] = React.useState(false);
  const [value2, setValue2] = React.useState("");

  return (
    <main>
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/expenses">Expenses</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/expenses/view">View</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/expenses/new">New</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/expenses/edit">Edit</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <h1 className="text-3xl font-bold">Expense Name</h1>
      <div className="py-5 space-y-5">
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">General</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="col-span-3 md:col-span-2">
              <Label>Within Group</Label>
              <br />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Select group"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Group name" />
                    <CommandList>
                      <CommandEmpty>No group found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="col-span-3 md:col-span-1">
              <Label>Amount</Label>
              <Input type="number" placeholder="Total spent" />
            </div>
            <div className="col-span-3 md:col-span-1">
              <Label>Category</Label>
              <Select onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="gasElectricity">
                    Gas & Electricity
                  </SelectItem>
                  <SelectItem value="coffee">Coffee</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="internetCable">
                    Internet & Cable
                  </SelectItem>
                  <SelectItem value="travelVacation">
                    Travel/Vacation
                  </SelectItem>
                  <SelectItem value="laundry">Laundry</SelectItem>
                  <SelectItem value="other">Other Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-3 md:col-span-2">
              <Label>Description</Label>
              <Textarea placeholder="Description..." />
            </div>
            <Separator className="col-span-3" />
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Splitting</h3>
          <div className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-3">
              <Label>Split Type</Label>
              <Select onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select split type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equal">Equal</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 md:col-span-2">
                  <div>
                    <Label>Split With Friends</Label>
                    <br />
                    <Popover open={open2} onOpenChange={setOpen2}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open2}
                          className="w-full justify-between"
                        >
                          {value2
                            ? friends.find((friend) => friend.value === value2)
                                ?.label
                            : "Select friend"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Friend name" />
                          <CommandList>
                            <CommandEmpty>No friend found.</CommandEmpty>
                            <CommandGroup>
                              {friends.map((friend) => (
                                <CommandItem
                                  key={friend.value}
                                  value={friend.value}
                                  onSelect={(currentValue) => {
                                    setValue2(
                                      currentValue === value ? "" : currentValue
                                    );
                                    setOpen2(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === friend.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {friend.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button className="col-span-3 md:col-span-1 self-end">
                  Add Friend
                </Button>
              </div>
            </div>
            <h3 className="text-xl font-semibold self-center">John Doe</h3>
            <div className="md:col-span-2">
              <Label>Percent</Label>
              <Input type="number" className="w-full" />
            </div>
            <div className="md:col-span-2">
              <Label>Total</Label>
              <Input
                disabled
                type="number"
                className="w-full"
                placeholder="Calculated"
              />
            </div>
            <Button className="self-end" variant="outline" size="icon">
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
            <h3 className="text-xl font-semibold self-center">Ana Santos</h3>
            <div className="md:col-span-2 invisible">
              <Label>Percent</Label>
              <Input type="number" className="w-full" />
            </div>
            <div className="md:col-span-2">
              <Label>Total</Label>
              <Input
                type="number"
                className="w-full"
                placeholder="Custom amount"
              />
            </div>
            <Button className="self-end" variant="outline" size="icon">
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
            <h3 className="text-xl font-semibold self-center">Jane Doe</h3>
            <div className="md:col-span-2 invisible">
              <Label>Percent</Label>
              <Input type="number" className="w-full" />
            </div>
            <div className="md:col-span-2">
              <Label>Total</Label>
              <Input
                disabled
                type="number"
                className="w-full"
                placeholder="Calculated"
              />
            </div>
            <Button className="self-end" variant="outline" size="icon">
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
            <Separator className="col-span-6" />
          </div>
        </section>
        <section className="w-full space-y-3">
          <div className="flex items-center gap-4">
            <div>
              <Label>New Friend</Label>
              <Input type="text" placeholder="Name" />
            </div>
            <Button className="self-end">Add</Button>
          </div>
          <Separator />
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Cancel</Button>
        </section>
      </div>
    </main>
  );
}
