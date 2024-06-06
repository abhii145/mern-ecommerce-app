import { IconType } from "react-icons";
import { Location } from "react-router-dom";

declare type LiProps = {
  url: string;
  text: string;
  location: Location<string>;
  Icon: IconType;
};



declare type WidgetItemProps = {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}



declare type CategoryItemProps ={
  color: string;
  value: number;
  heading: string;
}
