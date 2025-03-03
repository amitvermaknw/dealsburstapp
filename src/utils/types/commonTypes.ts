import React from 'react';

export type LayoutProps = {
    children: React.ReactNode
}

export type VoidFun = () => void;
export type EventType = { event?: React.ChangeEvent<HTMLInputElement> }

export type FormElements = {
    name: string,
    id: string,
    placeholder: string,
    type: string,
    label: string,
    value: string,
    validation: Array<{ required: boolean; alert: string; }>,
    imageObject?: string
    image?: string
}