import getFigureSvgId, { IFigureProps } from '../helpers/getFigureSvgId';

export function Figure(props: IFigureProps) {
    return (
        <svg className='cg-figure-svg'>
            <use href={`#${getFigureSvgId(props)}`}></use>
        </svg>
    );
}
