import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPizzaDetails = () => (
    <ContentLoader
        speed={2}
        width={680}
        height={466}
        viewBox="0 0 680 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="138" cy="135" r="130" />
        <rect x="288" y="11" rx="10" ry="10" width="266" height="27" />
        <rect x="285" y="51" rx="20" ry="20" width="269" height="141" />
        <rect x="285" y="216" rx="10" ry="10" width="106" height="40" />
        <rect x="411" y="211" rx="25" ry="25" width="140" height="45" />
    </ContentLoader>
)

export default SkeletonPizzaDetails