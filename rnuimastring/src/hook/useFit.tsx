import { useWindowDimensions } from 'react-native';

export const useFit = () => {
  const { width, height } = useWindowDimensions();

  const shorter = width < height ? width : height;

  // Đơn giản: luôn scale theo cạnh ngắn hơn (dễ đồng bộ giao diện)
  // Có thể đổi thành 360, 411, 428 tùy theo thiết kế gốc
  const fit = (val: number) => (shorter / 375) * val;

  return { fit, width, height };
};
