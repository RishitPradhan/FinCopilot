'use client';

import React from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineHome({ scene, className }: { scene: string; className?: string }) {
    return (
        <div className={className}>
            <Spline scene={scene} />
        </div>
    );
}
