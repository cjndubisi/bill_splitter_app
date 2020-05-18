export interface TextProp {
  bold?: boolean;
}

export type ButtonProps = {
  bold?: boolean;
  title: string;
  titleColor?: string;
  backgroundColor?: string;
  onPress?(): void;
};
