export interface SearchBarProps {
  onPress: () => void;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
}
