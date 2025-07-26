import Image from "next/image";

// import { CheckoutButton } from "@/components/shared/checkout-button";
// import { Collection } from "@/components/shared/collection";
import {
    getEventById,
    getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import type { SearchParamProps } from "@/types";

const EventDetails = async ({
    params: { id },
    searchParams,
}: SearchParamProps) => {
    const event = await getEventById(id);

    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: event._id,
        page: searchParams.page as string,
    });


    return (
        <div>
            page
        </div>
    )
}

export default EventDetails
