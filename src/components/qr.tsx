import { CSSProperties, useContext, useMemo } from 'react';
import { Context } from '../context';
import qrcode from 'qrcode-generator'
import '../styles/qr.css';
import { Figure } from './figure';
import { Color } from '../types';
import { generateUrl } from '../helpers/url';

export function Qr() {
    const { peerId } = useContext(Context);

    const qr = useMemo(() => {
        const q = qrcode(4, 'L');
         if (peerId) {
            q.addData(generateUrl(peerId));
            q.make();
        }
        return q;
    }, [peerId])

    const size = qr.getModuleCount();

    const data = useMemo(() => {
        return Array(size * size).fill(null);
    }, [size])

    return (
        <div className='cg-qr' style={{
                gridTemplateColumns: `repeat(${size}, var(--figure-size))`,
                gridTemplateRows: `repeat(${size}, var(--figure-size))`,
                '--qt-size': String(size)
            } as CSSProperties }>
            {
                peerId && data.map((_v, index) => {
                    return (
                        <div key={index}>
                            {
                                qr.isDark(Math.floor(index / size), index % size) ? <Figure selected={false} color={Color.Black} /> : ''
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}
