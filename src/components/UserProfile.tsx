const name = "Guest";

export default function UserProfile() {

    return <>
        <div className="flex flex-row gap-2">
            <div className="w-8 h-8 font-normal text-white rounded-full bg-gray-400 grid place-items-center">{name.charAt(0)}</div>
            <div className="h-full my-auto normal-case hidden md:block">{name}</div>
        </div>
    </>
}