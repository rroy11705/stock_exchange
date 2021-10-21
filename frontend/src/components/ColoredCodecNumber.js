import React from 'react'

export default function ColoredCodecNumber({ value, prefix }) {
    return (
        <p className={value > 0 ? "text-success" : value < 0 ? "text-danger" : ""}>
            {value > 0 ? "+" + value : value}{prefix}
        </p>
    )
}
