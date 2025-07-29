import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const SendIcon = (props: SvgProps) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
        <Path
            d="M9.99994 14L12.2727 19.3032C12.5856 20.0331 13.5585 20.1103 13.9486 19.4185C14.7182 18.0535 15.8591 15.8522 16.9999 13C18.9999 8 19.9999 4 19.9999 4M9.99994 14L4.69672 11.7272C3.9668 11.4144 3.88969 10.4414 4.58143 10.0514C5.9464 9.28173 8.14778 8.14086 10.9999 7C15.9999 5 19.9999 4 19.9999 4M9.99994 14L19.9999 4"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const VideoIcon = (props: SvgProps) => (
    <Svg width={16} height={9} viewBox="0 0 16 9" fill="none" {...props}>
        <Path
            d="M0 0.596028V6.45572C0.0053125 7.78071 1.0875 8.84697 2.40719 8.84165H10.9481C11.1909 8.84165 11.3862 8.64634 11.3862 8.40884V2.54947C11.3809 1.22447 10.2991 0.157903 8.97906 0.163215H0.438125C0.195313 0.163215 0 0.358528 0 0.596028ZM11.93 2.88197L15.4563 0.305715C15.7625 0.0525903 16 0.115715 16 0.57509V8.42978C16 8.95259 15.7097 8.88915 15.4563 8.69915L11.93 6.12822V2.88197Z"
            fill="#4A8CFF"
        />
    </Svg>
);
export default VideoIcon;
