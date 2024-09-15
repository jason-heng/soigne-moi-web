"use client"

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/_components/ui/button'
import { Input, type InputProps } from '@/_components/ui/input'
import { cn } from '@/_lib/utils'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('hide-password-toggle pr-10', className)}
                ref={ref}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-muted-foreground"
                onClick={() => setShowPassword(prev => !prev)}
            >
                {showPassword ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">{showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}</span>
            </Button>

            {/* hides browsers password toggles */}
            <style>
                {`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}
            </style>
        </div>
    )
})

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
