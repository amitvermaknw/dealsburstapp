'use client'
import { ON_CHANGE } from "../../../utils/Constants";
import React, { useReducer } from "react";
import SearchWidgetReducer from "./Reducer/SearchWidgetReducer";
import { SearchWidgetProps } from "@/utils/types/SearchWidget";

const useSearchWidget = (initState: SearchWidgetProps) => {
    const [state, dispatch] = useReducer(SearchWidgetReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    return [state, onChange]
}

export default useSearchWidget