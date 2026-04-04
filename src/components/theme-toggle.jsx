import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="relative shrink-0"
          onClick={toggleTheme}
          aria-label={isDark ? "Gunakan tema terang" : "Gunakan tema gelap"}
        >
          <SunIcon
            className="size-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            aria-hidden
          />
          <MoonIcon
            className="absolute size-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            aria-hidden
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {isDark ? "Tema terang" : "Tema gelap"}
      </TooltipContent>
    </Tooltip>
  )
}
