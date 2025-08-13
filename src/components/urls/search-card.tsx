import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'

const SearchCard = () => {
    return (
        <div>
            <Card className=" border-white/20">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/50 w-4 h-4" />
                            <Input
                                placeholder="Search by name or URL..."
                                // value={searchTerm}
                                // onChange={(e) => handleSearchChange(e.target.value)}
                                className="pl-10 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/50"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SearchCard