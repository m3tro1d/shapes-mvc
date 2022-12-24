import React, { useRef } from 'react'
import Point from '../../../model/common/Point'
import Settings from '../../../model/Settings'
import ShapeViewInterface from '../../../model/ShapeViewInterface'
import useShapeDragAndDrop from '../../../hooks/shapes/useShapeDragAndDrop'

type TriangleViewProps = {
    shape: ShapeViewInterface
    scaleFactor: number
    moveShape: (id: string, delta: Point) => void
}

function TriangleView({ shape, scaleFactor, moveShape }: TriangleViewProps): JSX.Element {
    const ref = useRef(null)

    const delta = useShapeDragAndDrop(
        ref,
        shape,
        scaleFactor,
        false,
        delta => moveShape(shape.getId(), delta),
    )

    return (
        <polygon
            ref={ref}
            points={getTrianglePointsAsPath(shape, delta)}
            fill={Settings.SHAPE_FILL_COLOR}
            stroke={Settings.SHAPE_STROKE_COLOR}
        />
    )
}

function getTrianglePointsAsPath(triangle: ShapeViewInterface, delta: Point): string {
    const points = calculateTrianglePoints(triangle)

    return points
        .map(point => `${point.x + delta.x},${point.y + delta.y}`)
        .join(' ')
}

export function calculateTrianglePoints(triangle: ShapeViewInterface): [Point, Point, Point] {
    const leftTop = triangle.getFrame().leftTop

    const firstPoint = {
        x: leftTop.x,
        y: leftTop.y + triangle.getFrame().height,
    }
    const secondPoint = {
        x: leftTop.x + triangle.getFrame().width / 2,
        y: leftTop.y,
    }
    const thirdPoint = {
        x: leftTop.x + triangle.getFrame().width,
        y: leftTop.y + triangle.getFrame().height,
    }

    return [firstPoint, secondPoint, thirdPoint]
}

export default TriangleView
