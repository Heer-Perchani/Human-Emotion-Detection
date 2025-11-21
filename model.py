from torch.nn.modules.pooling import MaxPool2d
from torch.nn.modules.activation import ReLU
from torch import nn, optim
num_of_classes = 5

class MyCNNModule(nn.Module):
    def __init__(self, num_classes=5):
      super(MyCNNModule, self).__init__()

      self.conv_block1 = nn.Sequential(
          nn.Conv2d(3,16, kernel_size=3,padding=1), #this is the first 2d convulation layer (used to extract features)
          nn.BatchNorm2d(16), #Normalizes the 32 feature maps produced by the previous layer like cleaning the outputs
          nn.ReLU(),
          nn.MaxPool2d(2)
      )

      # 3 is the number of RGB input channels which is 3 
      # 32 is the number of output channels means 32 features will be extracted
      # kernel size is the size of the sliding window which is 3 by 3 
      # padding is 1 which is the number of pixels added around image
      # What does it do?
      # Looks at 3×3 patches of the image.
      # Learns 32 different filters → each detects a pattern (edge, color blob, texture).

      # ReLU = Rectified Linear Unit.
      # What it does:
      # Turns all negative values into 0.
      # This adds non-linearity → helps CNN learn complex patterns

      self.conv_block2 = nn.Sequential(
          nn.Conv2d(16,32, kernel_size=3,padding=1),
          nn.BatchNorm2d(32),
          nn.ReLU(),
          nn.MaxPool2d(2)
  
      )

      self.conv_block3 = nn.Sequential(
          nn.Conv2d(32,64, kernel_size=3,padding=1),
          nn.BatchNorm2d(64),
          nn.ReLU(),
          nn.MaxPool2d(2)
  
      )

      self.conv_block4 = nn.Sequential(
          nn.Conv2d(64,128, kernel_size=3,padding=1),
          nn.BatchNorm2d(128),
          nn.ReLU(),
          nn.MaxPool2d(2)

      )

      self.fc = nn.Sequential( #final block or the classification head 
          nn.Flatten(),
          nn.Linear(128, 256), #256 is the features ffrom last layer and then 14 by 14 is the number of features iin the end after all the max poling. so the linear basically makes it all into 1d
          nn.ReLU(),
          nn.Dropout(0.5),
          nn.Linear(256,5)
                                    
      )

      self.global_pool = nn.AdaptiveAvgPool2d((1,1))

      # orignal images are 224 by 224, each max pool makes it half and chooses the best detected feature so 96 - 48 - 24 -12
      # then the linear basicallys combines all turns into one long vector and shortens it nto 512 length vector only the most imp features 
      # relu then helps us keep the strongest features and remove the low/noisy ones 
      # the dropout randomly turns off 50 percents of teh weights during this last layer traiting to prevent overfitting 
      # then lastly turn the 512 into 5 for each class

    def forward(self, x):
      x = self.conv_block1(x)
      x = self.conv_block2(x)
      x = self.conv_block3(x)
      x = self.conv_block4(x)
      x = self.global_pool(x)
      x = self.fc(x)
      return x

      #forward basically passes images through all layers 

      



