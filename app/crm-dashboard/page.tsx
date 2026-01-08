import React from 'react'

type Props = {
    props: string,
    newProps: number
}

const TestPage = (props: Props) => {
    props.props
    return (
        <div>page</div>
    )
}

export default TestPage