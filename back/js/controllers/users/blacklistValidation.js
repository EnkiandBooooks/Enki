import fs from 'fs';

export class BlacklistValidationController {

    static blacklist = fs.readFileSync("misc/badwords_es",'utf8')
        .split('\n')
        .map(p => p.trim().toLowerCase())
        .filter(p => p.length > 0);

    

    static async validateText(req, res) {
        try {
            const textBody = req.body.textBody;
            const regex = new RegExp(`\\b(${BlacklistValidationController.blacklist.join('|')})\\b`, 'i');
            const isValid = !regex.test(textBody.toLowerCase());
            res.json({
                validText: isValid,
            })
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: "Error fetching user data" });
        }
    }
}