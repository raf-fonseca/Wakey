const Indicator = ({coords}) => {

    return (
        <>
            <div
                style={{left: `${coords.left}px`, width: `${coords.width}px`, height: `${coords.height}px`}}
                className="
                    absolute
                    bg-white bg-opacity-5
                    border border-white border-solid border-opacity-10 rounded-lg
                    transition-all duration-300 ease-in-out
                "
            >

            </div>
        </>
    )
}

export default Indicator;