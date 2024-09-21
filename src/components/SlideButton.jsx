

const SlideButton = ({onClick, active}) => {

    return (
        <button
            onClick={onClick}
            type="button"
            className={`
                w-14 h-8 relative
                p-[3px]
                bg-white flex flex-row
                border border-white border-solid border-opacity-20 rounded-lg
                transition-all duration-200 ease-in-out
                ${active ?
                    'bg-opacity-20 border-opacity-60'
                    :
                    'bg-opacity-10 border-opacity-20'
                }
            `}
        >
            <div
                style={{transform: active ? 'translate(100%, 0)' : undefined}}
                className={`
                    transition-all duration-200 ease-in-out
                    h-full w-[50%] 
                    rounded-md
                    bg-white ${active ? 'bg-opacity-100' : 'bg-opacity-40'}
                    `}
                ></div>
        </button>
    )
}

export default SlideButton;