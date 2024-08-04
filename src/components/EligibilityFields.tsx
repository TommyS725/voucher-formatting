import { Weekdays } from "@/lib/types"
import { Switch } from "./ui/switch"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import TextInput from "./TextInput"
import { useVoucherDataContext } from "@/contexts/voucher-data-provider"




function EligibilityFields() {
    const [data, update] = useVoucherDataContext()  

    return (
        <div className="mt-8 space-y-16">

            <div className="grid w-full max-w-sm items-center gap-6">
                <div className="flex items-center space-x-2">
                    <Switch checked={data.minspendOn} onCheckedChange={update.setMinspendOn} />
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Minimum Spend
                    </label>
                </div>
                <Input type='number' placeholder="Minimum Spend" disabled={!data.minspendOn} value={data.minspend} onChange={(e) => update.setMinspend(Number(e.target.value))} />
            </div>

            <div className="grid w-full max-w-sm items-center gap-6">
                <div className="flex items-center space-x-2">
                    <Switch checked={data.weekdayOn} onCheckedChange={update.setWeekdayOn} />
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Weekdays {data.weekdayOn ? `(${data.weekdays.length})` : ''}
                    </label>
                </div>
                <div className="mt-4 flex flex-wrap align-middle ">
                    {
                        Weekdays.map((weekday, index) =>
                            <div className="flex  items-center space-x-2 pr-6 pb-4 "  key={'weekdays-' + index}>
                                <Checkbox
                                    checked={data.weekdays.includes(weekday)}
                                    disabled={!data.weekdayOn}
                                    onCheckedChange={(e) => {
                                        const newWeekdays = e ? [...data.weekdays, weekday].sort((a, b) => Weekdays.indexOf(a) - Weekdays.indexOf(b))
                                            : data.weekdays.filter(w => w !== weekday)
                                        update.setWeekdays(newWeekdays)
                                    }} />
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {weekday}
                                </label>
                            </div>)
                    }
                </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-6">
                <div className="flex items-center space-x-2">
                    <Switch checked={data.timeOn} onCheckedChange={update.setTimeOn} />
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Time of day
                    </label>
                </div>
               <TextInput className="dark:[color-scheme:dark]" label="From" placeholder="Start Time" setter={update.setStartTime} defaultValue={data.startTime} type='time' disabled={!data.timeOn} />
                <TextInput className="dark:[color-scheme:dark]" label="To" placeholder="End Time" setter={update.setEndTime} defaultValue={data.endTime} type='time' disabled={!data.timeOn} />
            </div>
        </div>
    )
}

export default EligibilityFields;