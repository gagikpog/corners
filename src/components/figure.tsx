import { useId, CSSProperties } from 'react';
import { Color, IProps } from '../types';

interface IFigureProps extends IProps {
    color: Color;
    selected: boolean;
}
const colors = {
    [Color.White]: {
        normal: {
            main: '#fff',
            second: '#ccc',
            border: '#bbb'
        },
        select: {
            main: '#eee',
            second: '#bbb',
            border: '#0f0'
        }
    },
    [Color.Black]: {
        normal: {
            main: '#000',
            second: '#333',
            border: '#666'
        },
        select: {
            main: '#111',
            second: '#444',
            border: '#0f0'
        }
    }
};

export function Figure(props: IFigureProps) {

    const col = colors[props.color][props.selected ? 'select' : 'normal'];
    const radialGradient = useId();
    const linearGradient = useId();

    return (
        <svg className='figure-svg' viewBox='0 0 87.213272 87.213272'>
            <defs>
                <linearGradient id={linearGradient}>
                    <stop style={{ stopColor: col.main, stopOpacity: '1'} as CSSProperties } offset="0" />
                    <stop style={{ stopColor: col.second, stopOpacity: '1'} as CSSProperties } offset="0.29166666" />
                    <stop style={{ stopColor: col.main, stopOpacity: '1' } as CSSProperties } offset="0.4074074" />
                    <stop style={{ stopColor: col.second, stopOpacity: '1'} as CSSProperties } offset="0.5162037" />
                    <stop style={{ stopColor: col.main, stopOpacity: '1'} as CSSProperties } offset="0.76157409" />
                    <stop style={{ stopColor: col.second, stopOpacity: '1'} as CSSProperties } offset="0.89583325" />
                    <stop style={{ stopColor: col.main, stopOpacity: '1'} as CSSProperties } offset="1" />
                </linearGradient>

                <radialGradient
                    href={`#${linearGradient}`}
                    id={radialGradient}
                    cx="50"
                    cy="50"
                    fx="50"
                    fy="50"
                    r="42.5"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(-6.393364,-6.393364)" />
            </defs>

            <circle cx="43" cy="43" r="42"
                style={{
                    display: 'inline',
                    fill: `url(#${radialGradient})`,
                    stroke: col.border,
                    strokeWidth: props.selected ? '3' : '1',
                    strokeDasharray: 'none',
                    strokeOpacity: '1'
                } as React.CSSProperties }
            />
        </svg>
    );
}
