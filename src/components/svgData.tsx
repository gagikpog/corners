import { useId, CSSProperties } from 'react';
import { Color } from '../types';
import getFigureSvgId, { IFigureProps } from '../helpers/getFigureSvgId';

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

export function SvgData() {
    return (
        <svg className='cg-figure-svg-path'>
            <Figure color={Color.White} selected={false} />
            <Figure color={Color.White} selected={true} />
            <Figure color={Color.Black} selected={false} />
            <Figure color={Color.Black} selected={true} />
        </svg>
    );
}

function Figure(props: IFigureProps) {
    const col = colors[props.color][props.selected ? 'select' : 'normal'];
    const radialGradient = useId();
    const linearGradient = useId();

    return (
        <symbol id={getFigureSvgId(props)} viewBox='0 0 87.2 87.2'>
            <defs>
                <linearGradient id={linearGradient}>
                    <stop style={{ stopColor: col.main, stopOpacity: '1'} as CSSProperties } offset="0" />
                    <stop style={{ stopColor: col.second, stopOpacity: '1'} as CSSProperties } offset="0.29" />
                    <stop style={{ stopColor: col.main, stopOpacity: '1' } as CSSProperties } offset="0.40" />
                    <stop style={{ stopColor: col.second, stopOpacity: '1'} as CSSProperties } offset="0.51" />
                    <stop style={{ stopColor: col.main, stopOpacity: '1'} as CSSProperties } offset="0.76" />
                    <stop style={{ stopColor: col.second, stopOpacity: '1'} as CSSProperties } offset="0.89" />
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
                    gradientTransform="translate(-6.39,-6.39)" />
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
        </symbol>
    );
}