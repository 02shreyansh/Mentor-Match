import { Avatar,AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
const StarMentors = () => {
    return (
        <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Our Star Mentors</h2>
            <div className="flex flex-wrap justify-center gap-6">
                <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16 mb-2">
                        <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Ravi Singh</p>
                    <p className="text-sm text-gray-600">Tech Lead at Google</p>
                    <div className="mt-1 flex gap-1">
                        <Badge variant="secondary">AI/ML</Badge>
                        <Badge variant="secondary">DSA</Badge>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16 mb-2">
                        <AvatarFallback>PJ</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Priya Joshi</p>
                    <p className="text-sm text-gray-600">Product Manager at Microsoft</p>
                    <div className="mt-1 flex gap-1">
                        <Badge variant="secondary">MBA</Badge>
                        <Badge variant="secondary">Leadership</Badge>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16 mb-2">
                        <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Arun Kumar</p>
                    <p className="text-sm text-gray-600">Research Scientist at IBM</p>
                    <div className="mt-1 flex gap-1">
                        <Badge variant="secondary">Research</Badge>
                        <Badge variant="secondary">Data Science</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StarMentors