import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RewardListComponent } from './reward-list.component';
import { RewardService } from '../../services/reward.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RewardListComponent', () => {
  let component: RewardListComponent;
  let fixture: ComponentFixture<RewardListComponent>;
  let mockRewardService: jasmine.SpyObj<RewardService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUser = {
    id: 1,
    username: 'testChild',
    role: 'CHILD',
    points: 50,
    password: 'mockPassword'
  };

  const expensiveReward = {
    id: 1,
    name: 'Expensive Reward',
    description: 'Test Description',
    pointsRequired: 100
  };

  beforeEach(async () => {
    mockRewardService = jasmine.createSpyObj('RewardService', 
      ['redeemReward', 'getAllRewards', 'getRedemptions', 'getChildReport']
    );
    
    mockRewardService.getAllRewards.and.returnValue(of([]));
    mockRewardService.getRedemptions.and.returnValue(of([]));
    mockRewardService.getChildReport.and.returnValue(of(null));
    
    mockAuthService = jasmine.createSpyObj('AuthService', 
      ['updateCurrentUser'], 
      { currentUser$: of(mockUser) }
    );
    
    mockUserService = jasmine.createSpyObj('UserService', ['getUser']);

    await TestBed.configureTestingModule({
      imports: [
        RewardListComponent,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: RewardService, useValue: mockRewardService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RewardListComponent);
    component = fixture.componentInstance;
    component.currentUser = { ...mockUser };
    spyOn(window, 'alert');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when user has insufficient points', () => {
    component.redeemReward(expensiveReward);
    
    expect(window.alert).toHaveBeenCalledWith(
      'You need 100 points to redeem this reward. You currently have 50 points.'
    );
  });

  it('should successfully redeem reward when user has sufficient points', () => {
    const affordableReward = {
      id: 1,
      name: 'Cheap Reward',
      description: 'Test Description',
      pointsRequired: 25
    };
    
    mockRewardService.redeemReward.and.returnValue(of(void 0));
    
    component.redeemReward(affordableReward);
    
    expect(mockRewardService.redeemReward).toHaveBeenCalledWith(
      affordableReward.id, 
      mockUser.id
    );
    expect(component.currentUser?.points).toBe(25); // 50 - 25
    expect(window.alert).toHaveBeenCalledWith('Reward redeemed successfully!');
  });
});
