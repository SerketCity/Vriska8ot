# Work with Python 3.9
import discord
from discord.ext import commands
from discord.utils import get
import asyncio
from itertools import cycle

fileStream = open("TOKEN.txt", "r")
TOKEN = fileStream.readline()
fileStream.close()

bot = commands.Bot(command_prefix = '8')
bot.remove_command('help')

@bot.event
async def on_message(message):
    author = message.author
    content = message.content
    channel = message.channel
    print('{}: {}'.format(author, content))
    
    if message.author == bot.user:
        return

    await bot.process_commands(message)

    if content.startswith('8hello'):
        msg = 'Hello, {0.author.mention}!!!!!!!!'.format(message)
        await channel.send(msg)
        return

    if content.startswith('this is so sad vriska8ot play oh no'):
        msg = 'https://www.youtube.com/watch?v=uClcSaX0cj8'.format(message)
        await channel.send(msg)
        return

    if content.startswith('8say'):
        msg = content.split()
        output = ''
        for word in msg[1:]:
            output += word
            output += ' '    
        await channel.send(output)
        await message.delete()

@bot.command(pass_context=True)
async def help(ctx):
    channel = ctx.message.channel

    embed = discord.Embed(color = 0x0715cd)

    embed.set_author(name='Vriska8ot Commands', icon_url='https://i.imgur.com/27xHF8G.png')
    embed.set_thumbnail(url='https://i.imgur.com/WVbKctv.gif')
    embed.add_field(name='8hello', value='Say hello to me', inline=False)
    embed.add_field(name='8say', value='Have me mimic you', inline=False)
    embed.set_footer(text='ᴬ ᶜᵉʳᵗᶦᶠᶦᵉᵈ ᴸᶦˡ ᶜᵒʲᶦ ᴾʳᵒᵈᵘᶜᵗ')
    await channel.send(embed=embed) 

@bot.command(pass_context=True)
async def spider(ctx):
    channel = ctx.message.channel
    await channel.send(file=discord.File('media/Vriska_Serket.png'))

#currently broken
@bot.event
async def on_message_delete(message):
    if message.content.startswith('8say'):
        return
    
    if message.author == bot.user:
        return
    else:
        channel = message.channel
        await channel.send('Who deleted {}\'s message? It said: {}'.format(message.author.mention, message.content))
        return

@bot.event
async def on_ready():
    await bot.change_presence(status=discord.Status.do_not_disturb, activity=discord.Game(name='with John\'s heart'))
    print('Logged in as')
    print(bot.user.name)
    print(bot.user.id)
    print('------')

bot.run(TOKEN)
