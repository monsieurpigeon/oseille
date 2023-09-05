import { useFarmParameters } from '../../../utils/hooks/useFarmParameters';
import { Farm } from '../Farm';
import { Logo } from '../Logo';

export function FarmSection() {
  const { farm } = useFarmParameters();

  return (
    <div>
      <Logo />
      <Farm farm={farm} />
    </div>
  );
}
