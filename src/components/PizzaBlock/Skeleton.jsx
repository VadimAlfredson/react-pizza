import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="135" cy="135" r="130" />
        <rect x="0" y="280" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="320" rx="20" ry="20" width="280" height="90" />
        <rect x="5" y="425" rx="10" ry="10" width="110" height="40" />
        <rect x="140" y="420" rx="25" ry="25" width="140" height="45" />
    </ContentLoader>
)

export default PizzaSkeleton