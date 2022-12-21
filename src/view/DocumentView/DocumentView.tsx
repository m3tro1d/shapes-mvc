import React from 'react'
import Settings from '../../model/Settings'
import styles from './DocumentView.module.css'
import ShapeInterface from '../../model/ShapeInterface'
import ShapeType from '../../model/ShapeType'
import RectangleView from './RectangleView/RectangleView'
import TriangleView from './TriangleView/TriangleView'
import EllipseView from './EllipseView/EllipseView'
import DocumentInterface from '../../model/DocumentInterface'
import { connect } from '../../controller/Main'
import useUpdateOnPropsChange from '../../hooks/useUpdateOnPropsChange'

type DocumentViewProps = {
    shapes: ShapeInterface[]
}

function DocumentView({ shapes }: DocumentViewProps): JSX.Element
{
    useUpdateOnPropsChange(shapes)

    return (
        <svg
            viewBox={`0 0 ${Settings.DOCUMENT_WIDTH} ${Settings.DOCUMENT_HEIGHT}`}
            className={styles.document}
            tabIndex={0}
            onDragOver={event => event.preventDefault()}
        >
            {shapes.map(shape => {
                switch (shape.getType())
                {
                case ShapeType.RECTANGLE:
                    return <RectangleView
                        key={shape.getId()}
                        shape={shape}
                    />
                case ShapeType.TRIANGLE:
                    return <TriangleView
                        key={shape.getId()}
                        shape={shape}
                    />
                case ShapeType.ELLIPSE:
                    return <EllipseView
                        key={shape.getId()}
                        shape={shape}
                    />
                default:
                    return null
                }
            })}
        </svg>
    )
}

const mapModelToProps = (model: DocumentInterface): DocumentViewProps => ({
    shapes: model.getShapes(),
})

export default connect(mapModelToProps, null)(DocumentView)
