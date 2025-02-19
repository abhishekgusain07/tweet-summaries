import TabCard from "@/components/Tabcard";

const Extract = () => {
    return (
        <TabCard heading="Generate summary of all your bookMarks in a day" subHeading="Summarize all your bookmarks in a day">
                <div className="flex flex-col items-center justify-start h-full w-fit min-h-[500px]">
                    <div className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mx-auto max-w-md sm:max-w-none px-4 sm:px-2">
                            <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </TabCard>
    );
}
export default Extract;