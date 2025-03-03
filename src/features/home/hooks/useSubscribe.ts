import React, { useReducer } from "react";
import { ON_CHANGE } from "../../../utils/Constants";
// import { addSubscriber } from "../services/subscribeService";
import { SubscriberFormProps } from "@/utils/types/SubscriberType";
import { submitSubscribe } from "@/app/api/home/subscribe/route";
import { AppLocation } from "@/utils/appLocation";
import OnchangeReducer from "@/hooks/reducer/OnchangeReducer";

const useSubscribe = (initState: SubscriberFormProps) => {
    const [state, dispatch] = useReducer(OnchangeReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    const onSubmit = async () => {
        // addSubscriber(state);
        const subscriber = {
            subscriber_email: state.semail.value,
            timestamp: new Date().toISOString(),
            location: await AppLocation,
            device: ''
        };

        submitSubscribe(subscriber)
        return true;
    }


    return [state, onChange, onSubmit]
}

export default useSubscribe;