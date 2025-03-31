const MentorBenefits = () => {
    return (
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Why Become a Mentor?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <h3 className="font-medium mb-2">Give Back to the Community</h3>
                    <p className="text-sm text-gray-600">
                        Share your knowledge and experience to help the next generation of professionals succeed.
                    </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <h3 className="font-medium mb-2">Develop Leadership Skills</h3>
                    <p className="text-sm text-gray-600">
                        Mentoring others helps you enhance your own communication, leadership, and coaching abilities.
                    </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <h3 className="font-medium mb-2">Expand Your Network</h3>
                    <p className="text-sm text-gray-600">
                        Connect with other mentors and professionals in your field, creating valuable relationships.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MentorBenefits