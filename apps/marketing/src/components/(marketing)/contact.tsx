import React from 'react';

import { Button } from '@documenso/ui/primitives/button';
import { Input } from '@documenso/ui/primitives/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@documenso/ui/primitives/select';
import { Textarea } from '@documenso/ui/primitives/textarea';

import { WidgetContact } from './widget-contact';

// ზოგადი / General
// გაყიდვები / Sales
// ტექნიკური დახმარება / Technical support
// ფინანსები და ბილინგი / Finance & Billing
// მარკეტინგი / Marketing
// შეტყობინება* / Message

const options = [
  {
    id: 1,
    value: '1',
    label: 'ზოგადი',
  },
  {
    id: 2,
    value: '2',
    label: 'გაყიდვები',
  },
  {
    id: 3,
    value: '3',
    label: 'ტექნიკური დახმარება',
  },
  {
    id: 4,
    value: '4',
    label: 'ფინანსები და ბილინგი',
  },
  {
    id: 5,
    value: '5',
    label: 'მარკეტინგი',
  },
];

function ContactContainer() {
  return (
    <>
      <WidgetContact className="w-full">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input placeholder="Name" />
          <Input placeholder="Last Name" />
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={options.find((country) => country.value === '1')?.label} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                className="dark:hover:text-[#FFEB81]"
                key={option.id}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="company" />
        <Input placeholder="email" />
        <Input placeholder="phone" />
        <Textarea className="resize-none" placeholder="message" />

        <div className="flex items-center justify-end space-x-2">
          <Input className="h-8 w-8" type="checkbox" />
          <p>
            გაგზავნის ღილაკზე დაჭერით, თქვენ ეთანხმებით eSignix-ის კონფიდენციალურობის პოლიტიკას,
            წესებს და პირობებს.
          </p>
        </div>

        <Button type="submit">Send</Button>
      </WidgetContact>
    </>
  );
}

export default ContactContainer;
