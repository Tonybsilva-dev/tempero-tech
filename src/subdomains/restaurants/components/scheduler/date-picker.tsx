import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale/pt-BR";
import { tomorrow } from "@/src/shared/modules/helpers/date";

registerLocale("pt-BR", ptBR);

interface DatePickerProps {
  selectedDate: Date;
  // eslint-disable-next-line no-unused-vars
  onChange: (date: Date) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
}) => {
  return (
    <div className="calendar-container">
      <DatePicker
        locale={"pt-BR"}
        selected={selectedDate}
        onChange={onChange}
        inline
        calendarClassName="ring-1 ring-gray-200 rounded-lg p-2 mt-1"
        minDate={tomorrow}
      />
    </div>
  );
};

export default CustomDatePicker;