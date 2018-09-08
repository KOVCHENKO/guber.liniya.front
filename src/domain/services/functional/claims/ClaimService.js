class ClaimService {
    updateClaimInCollection(claims, claim) {
        const subIndex = claims.map((e) => {
            return e.id;
        }).indexOf(claim.id);
        claims[subIndex].name = claim.name;
        claims[subIndex].description = claim.description;
        claims[subIndex].firstname = claim.firstName;
        claims[subIndex].middlename = claim.middleName;
        claims[subIndex].lastname = claim.lastName;
        claims[subIndex].address = claim.address;
        claims[subIndex].phone = claim.phone;
        claims[subIndex].dispatch_status = claim.dispatchStatus;
        return claims;
    }
}
export default ClaimService;
//# sourceMappingURL=ClaimService.js.map