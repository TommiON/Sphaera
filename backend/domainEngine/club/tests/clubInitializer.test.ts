import gameParameters from "../../../domainProperties/gameParameters";

// Create separate mocks for each repository BEFORE the jest.mock call
const mockClubRepository = {
    save: jest.fn(),
    createQueryBuilder: jest.fn()
};

const mockPlayerRepository = {
    save: jest.fn()
};

jest.mock("../../../repositories/repositories", () => ({
    clubRepository: mockClubRepository,
    playerRepository: mockPlayerRepository
}));

// Import after mocking
import { clubRepository, playerRepository } from "../../../repositories/repositories";
import { initAndSaveClub, initAndSaveZombieClub } from "../clubInitializer";

describe("domain engine / initialization of clubs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("init and save user club", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            
            const mockClub = {
                id: 1,
                name: "Test Club",
                established: new Date(),
                players: [],
                account: null
            };

            (clubRepository.save as jest.Mock).mockResolvedValue(mockClub);
            (clubRepository.createQueryBuilder as jest.Mock).mockReturnValue({
                relation: jest.fn().mockReturnValue({
                    of: jest.fn().mockReturnValue({
                        set: jest.fn().mockResolvedValue(undefined),
                        add: jest.fn().mockResolvedValue(undefined)
                    })
                })
            });

            (playerRepository.save as jest.Mock).mockResolvedValue({
                id: 1,
                name: "Test Player",
                playingNumber: 1
            });
        });

        it("should create a club with the proposed name and current date", async () => {
            const proposedName = "Test Club";

            const result = await initAndSaveClub(proposedName);

            expect(result.name).toBe(proposedName);
            expect(clubRepository.save).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: proposedName,
                    established: expect.any(Date)
                })
            );
        });

        it("should create a club with initial players", async () => {
            const proposedName = "Test Club";

            await initAndSaveClub(proposedName);

            expect(playerRepository.save).toHaveBeenCalledTimes(gameParameters.CLUB_NUMBER_OF_PLAYERS_AT_START);
        });

        it("should create players with sequential playing numbers", async () => {
            const proposedName = "Test Club";

            await initAndSaveClub(proposedName);

            const playerSaveCalls = (playerRepository.save as jest.Mock).mock.calls;
            
            for (let i = 0; i < gameParameters.CLUB_NUMBER_OF_PLAYERS_AT_START; i++) {
                expect(playerSaveCalls[i][0]).toEqual(
                    expect.objectContaining({
                        playingNumber: i + 1
                    })
                );
            }
        });

        it("should associate the club with the user account when provided", async () => {
            const proposedName = "Test Club";
            const mockUser = { id: 1, username: "tester" };

            await initAndSaveClub(proposedName, mockUser as any);

            expect(clubRepository.createQueryBuilder).toHaveBeenCalled();
            const mockQueryBuilder = (clubRepository.createQueryBuilder as jest.Mock).mock.results[0].value;
            expect(mockQueryBuilder.relation).toHaveBeenCalledWith(expect.anything(), "account");
        });

        it("should not associate club with account when forUser is undefined", async () => {
            const proposedName = "Test Club";

            await initAndSaveClub(proposedName, undefined);

            // Relation should be called for players but not for account
            const mockQueryBuilder = (clubRepository.createQueryBuilder as jest.Mock).mock.results[0].value;
            const relationCalls = (mockQueryBuilder.relation as jest.Mock).mock.calls;
            const accountRelationCalls = relationCalls.filter(call => call[1] === "account");
            expect(accountRelationCalls.length).toBe(0);
        });

        it("should create players with required attributes", async () => {
            const proposedName = "Test Club";

            await initAndSaveClub(proposedName);

            const playerSaveCalls = (playerRepository.save as jest.Mock).mock.calls;
            const firstPlayerCall = playerSaveCalls[0][0];

            // Check that all required player attributes are present
            expect(firstPlayerCall).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                    birthday: expect.any(Date),
                    playingNumber: expect.any(Number),
                    footedness: expect.stringMatching(/^(right|left|both)$/),
                    stamina: expect.any(Number),
                    ruggedness: expect.any(Number),
                    pace: expect.any(Number),
                    vision: expect.any(Number),
                    positioning: expect.any(Number),
                    experience: expect.any(Number),
                    heading: expect.any(Number),
                    shooting: expect.any(Number),
                    shortPassing: expect.any(Number),
                    longPassing: expect.any(Number),
                    ballControl: expect.any(Number),
                    tackling: expect.any(Number),
                    goalkeeping: expect.any(Number),
                    dribbling: expect.any(Number)
                })
            );
        });

        it("should create players with skill values within valid range", async () => {
            const proposedName = "Test Club";

            await initAndSaveClub(proposedName);

            const playerSaveCalls = (playerRepository.save as jest.Mock).mock.calls;
            
            playerSaveCalls.forEach((call, index) => {
                const player = call[0];
                const skillAttributes = [
                    'stamina', 'ruggedness', 'pace', 'vision', 'positioning',
                    'heading', 'shooting', 'shortPassing', 'longPassing',
                    'ballControl', 'tackling', 'goalkeeping', 'dribbling'
                ];

                skillAttributes.forEach(skill => {
                    expect(player[skill]).toBeGreaterThanOrEqual(1);
                    expect(player[skill]).toBeLessThanOrEqual(gameParameters.PLAYER_SKILL_CEILING_AT_START);
                });
            });
        });

        it("should create players with experience value of 1", async () => {
            const proposedName = "Test Club";

            await initAndSaveClub(proposedName);

            const playerSaveCalls = (playerRepository.save as jest.Mock).mock.calls;
            playerSaveCalls.forEach(call => {
                expect(call[0].experience).toBe(1);
            });
        });
    });

    describe("init and save zombie club", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            
            const mockClub = {
                id: 1,
                name: "Automatisoitu joukkue 12345",
                established: new Date(),
                players: [],
                account: null
            };

            (clubRepository.save as jest.Mock).mockResolvedValue(mockClub);
            (clubRepository.createQueryBuilder as jest.Mock).mockReturnValue({
                relation: jest.fn().mockReturnValue({
                    of: jest.fn().mockReturnValue({
                        set: jest.fn().mockResolvedValue(undefined),
                        add: jest.fn().mockResolvedValue(undefined)
                    })
                })
            });

            (playerRepository.save as jest.Mock).mockResolvedValue({
                id: 1,
                name: "Test Player",
                playingNumber: 1
            });
        });

        it("should create a zombie club with 'Automatisoitu joukkue' prefix in name", async () => {
            const result = await initAndSaveZombieClub();

            expect(result.name).toMatch(/^Automatisoitu joukkue/);
        });

        it("should create a zombie club without associating to a user", async () => {
            await initAndSaveZombieClub();

            // Verify that set() was never called for account association
            expect(clubRepository.createQueryBuilder).toHaveBeenCalled();
            const mockQueryBuilder = (clubRepository.createQueryBuilder as jest.Mock).mock.results[0].value;
            const relationCalls = (mockQueryBuilder.relation as jest.Mock).mock.calls;
            const setCallsForAccount = relationCalls.filter(call => call[1] === "account");
            expect(setCallsForAccount.length).toBe(0);
        });

        it("should create a zombie club with initial players", async () => {
            await initAndSaveZombieClub();

            expect(playerRepository.save).toHaveBeenCalledTimes(gameParameters.CLUB_NUMBER_OF_PLAYERS_AT_START);
        });

        it("should generate unique names for zombie clubs", async () => {
            const mockClub1 = {
                id: 1,
                name: "Automatisoitu joukkue50000",
                established: new Date(),
                players: [],
                account: null
            };

            const mockClub2 = {
                id: 2,
                name: "Automatisoitu joukkue75000",
                established: new Date(),
                players: [],
                account: null
            };

            (clubRepository.save as jest.Mock)
                .mockResolvedValueOnce(mockClub1)
                .mockResolvedValueOnce(mockClub2);

            const club1 = await initAndSaveZombieClub();
            const club2 = await initAndSaveZombieClub();

            // Names should be different (at least very likely due to random number generation)
            expect(club1.name).not.toEqual(club2.name);
        });
    });
});
