exports.planValidation = (req, res, next) => {

    const { 
        name, 
        duration_months, 
        price, 
        description, 
        status 
    } = req.body
    const missingFields = [];

    if (!name) missingFields.push("plan_name");
    if (!duration_months) missingFields.push("duration_months");
    if (!price) missingFields.push("price");
    if (!description) missingFields.push("description");


    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `${missingFields.join(", ")} fields are required`
        });
    }
    if (typeof name !== "string" || name.trim().length < 3) {

        return res.status(400).json({
            message: "Plan name must be at least 3 characters"
        });

    }

    if (
        isNaN(duration_months) ||
        duration_months < 1 ||
        duration_months > 12
    ) {

        return res.status(400).json({
            message: "Plan duration must be between 1 and 12 months"
        });

    }


    if (
        isNaN(price) ||
        price <= 0 ||
        price > 100000
    ) {

        return res.status(400).json({
            message: "Plan price must be between 1 and 100000"
        });

    }
    if (description.length > 500) {

        return res.status(400).json({
            message: "Description cannot exceed 500 characters"
        });

    }
    if (
        status &&
        !["active", "inactive"].includes(status)
    ) {

        return res.status(400).json({
            message: "Invalid status"
        });

    }



    next();

};