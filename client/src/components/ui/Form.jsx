export default function Form({ childInputs, action, submitCallback }) {
    return (
        <form 
         action={action}
         onSubmit={submitCallback}
         className="flex flex-col items-center justify-center 
         rounded-(--border-radius) bg-white p-[clamp(20px,5.5vw,40px)]">
            {childInputs}
            <button className="bg-(--color-primary) customButtons"></button>
        </form>
    )
}