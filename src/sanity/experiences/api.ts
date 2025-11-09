export const experiencesListQuery = `
*[_type == "experiences"] | order(startDate desc){
    _id,
    company,
    logo,
    role,
    employmentType,
    location,
    isRemote,
    startDate,
    endDate,
    isCurrent,
    summary,
    highlights,
    techStack
}`;