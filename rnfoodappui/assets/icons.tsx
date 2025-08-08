import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg";
export const VuongMien = (props: SvgProps) => (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
        <G clipPath="url(#clip0_4_79)">
            <Path
                d="M11.8352 3.53407C11.6934 3.41306 11.4934 3.38756 11.3258 3.46917L8.76066 4.71792L6.35382 1.94288C6.2648 1.84022 6.13559 1.78125 5.9997 1.78125C5.86381 1.78125 5.73462 1.84022 5.64558 1.94288L3.23874 4.7179L0.673645 3.46915C0.505997 3.38756 0.305981 3.41304 0.164184 3.53405C0.0223875 3.65505 -0.0342375 3.8486 0.0199734 4.02696L1.80122 9.88634C1.86125 10.0838 2.04333 10.2188 2.2497 10.2188H9.7497C9.95604 10.2188 10.1382 10.0838 10.1982 9.88636L11.9794 4.02698C12.0336 3.84862 11.977 3.65508 11.8352 3.53407Z"
                fill="#F5CA48"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_4_79">
                <Rect width={12} height={12} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);
