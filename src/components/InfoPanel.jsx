export default function InfoPanel({location}){

    if(!location) return null;

    if(location.type === "region"){
        return (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">
                <h6>Region Information</h6>
                <p>{location.data.name}</p>
            </div>
        )
    }


    if(location.type === "province"){
        return (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">
                <h6>Province Information</h6>
                <p>{location.data.name}</p>
            </div>
        )
    }

    if(location.type === "hospital"){
        return (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">
                <h6>Hospital Information</h6>
                <p>{location.data.name}</p>
            </div>
        )
    }

    if(location.type === "terminal"){
        return (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">
                <h6>Terminal Information</h6>
                <p>{location.data.name}</p>
            </div>
        )
    }

    if(location.type === "firestation"){
        return (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">
                <h6>Firestation Information</h6>
                <p>{location.data.name}</p>
            </div>
        )
    }

    if(location.type === "mall"){
        return (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">
                <h6>Mall Information</h6>
                <p>{location.data.name}</p>
            </div>
        )
    }

    if(location.type === "volcano"){
        return (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">
                <h6>Volcano Information</h6>
                <p>{location.data.name}</p>
            </div>
        )
    }
}