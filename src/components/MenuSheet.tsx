import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Switch } from "./ui/switch"
import { Label } from "@/components/ui/label"
import { useSettingContext } from "../contexts/setting-provider"






function MenuSheet() {
    const {autoIncrement} = useSettingContext()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu size={32} className=" cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className=" text-2xl font-bold ">Menu</SheetTitle>
                    <SheetDescription  >
        
                    </SheetDescription>
                </SheetHeader>
                      <div className=" grid grid-cols-2 gap-x-4 gap-y-8 py-8 justify-items-center">
                      <Label className=" text-lg font-medium" >Theme</Label>
                        <ModeToggle />
                        <Label className=" text-lg font-medium">Auto Increment</Label>
                        <Switch checked={autoIncrement.value} onCheckedChange={autoIncrement.setValue} />
                      </div>
            </SheetContent>
        </Sheet>


    )
}

export default MenuSheet